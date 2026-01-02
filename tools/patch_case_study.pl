#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use open ':std', ':encoding(UTF-8)';

# -------------------------
# Config / CLI
# -------------------------
my $file        = 'index.html';
my $snippet_file= '/tmp/case-study-performance.html';

my $dry_run  = 0;
my $backup   = 1;
my $replace  = 0;

# Kotwice (po tych H3 wstawiamy)
my $anchor1 = 'Kontrola jakości danych i procesów';
my $anchor2 = 'Dashboardy wspierające codzienne decyzje';

# Nowy tytuł (dla idempotencji / replace)
my $new_title = q{Wydajność i dostępność bez przebudowy strony};
for (my $i=0; $i<@ARGV; $i++) {
  my $a = $ARGV[$i];
  if ($a eq '--file')        { $file = $ARGV[++$i] // die "--file wymaga wartości\n"; next; }
  if ($a eq '--snippet')     { $snippet_file = $ARGV[++$i] // die "--snippet wymaga wartości\n"; next; }
  if ($a eq '--dry-run')     { $dry_run = 1; next; }
  if ($a eq '--no-backup')   { $backup = 0; next; }
  if ($a eq '--backup')      { $backup = 1; next; }
  if ($a eq '--replace')     { $replace = 1; next; }
  if ($a eq '--help') {
    print <<"HELP";
Użycie:
  $0 --file index.html --snippet /tmp/case-study-performance.html [--dry-run] [--no-backup] [--replace]

Zasady:
- Kotwice tylko po treści <h3> (normalizacja tekstu).
- Operacje tylko w <section id="case-studies">.
- Fail-fast jeśli nie znajdzie kotwic lub znajdzie wielokrotnie.
- Idempotencja: jeśli nowy tytuł już istnieje -> stop (chyba że --replace).

HELP
    exit 0;
  }
  die "Nieznana opcja: $a (użyj --help)\n";
}

# -------------------------
# Helpers
# -------------------------
sub slurp_file {
  my ($path) = @_;
  open my $fh, '<:encoding(UTF-8)', $path or die "Nie mogę otworzyć $path: $!\n";
  local $/;
  my $s = <$fh>;
  close $fh;
  return $s;
}

sub write_file {
  my ($path, $content) = @_;
  open my $fh, '>:encoding(UTF-8)', $path or die "Nie mogę zapisać $path: $!\n";
  print $fh $content;
  close $fh;
}

sub backup_file {
  my ($path) = @_;
  my @t = localtime();
  my $ts = sprintf("%04d%02d%02d_%02d%02d%02d", $t[5]+1900, $t[4]+1, $t[3], $t[2], $t[1], $t[0]);
  my $bak = "$path.bak.$ts";
  open my $in,  '<:raw', $path or die "Backup: nie mogę czytać $path: $!\n";
  open my $out, '>:raw', $bak  or die "Backup: nie mogę pisać $bak: $!\n";
  while (1) {
    my $r = read($in, my $buf, 65536);
    die "Backup: błąd odczytu: $!\n" if !defined $r;
    last if $r == 0;
    print $out $buf;
  }
  close $in; close $out;
  return $bak;
}

sub decode_entities_basic {
  my ($s) = @_;
  # Minimalny dekoder: named + numeryczne
  $s =~ s/&nbsp;/ /gi;
  $s =~ s/&amp;/&/gi;
  $s =~ s/&lt;/</gi;
  $s =~ s/&gt;/>/gi;
  $s =~ s/&quot;/"/gi;
  $s =~ s/&#39;/'/gi;

  # &#1234;
  $s =~ s/&#(\d+);/chr($1)/eg;
  # &#x1F600;
  $s =~ s/&#x([0-9a-fA-F]+);/chr(hex($1))/eg;
  return $s;
}

sub norm_text {
  my ($s) = @_;
  $s =~ s/<[^>]+>//g;              # usuń tagi
  $s = decode_entities_basic($s);  # encje
  $s =~ s/\s+/ /g;                 # whitespace do jednej spacji
  $s =~ s/^\s+|\s+$//g;            # trim
  return $s;
}

sub find_case_studies_section {
  my ($html) = @_;
  # Nie polegamy na whitespace ani kolejności atrybutów: szukamy id="case-studies" w <section ...>
  my $re = qr/<section\b[^>]*\bid\s*=\s*["']case-studies["'][^>]*>/i;
  if ($html !~ /$re/) {
    die "FAIL: Nie znaleziono <section id=\"case-studies\">.\n";
  }
  my $start = $-[0];
  my $open_tag_end = $+[0];

  # Dopasuj zamknięcie </section> odpowiadające temu otwarciu (prosty licznik sekcji)
  my $pos = $open_tag_end;
  my $depth = 1;

  while ($pos < length($html)) {
    my $next_open  = index(lc($html), '<section', $pos);
    my $next_close = index(lc($html), '</section', $pos);

    die "FAIL: Nie domknięto section (brak </section> po id=case-studies).\n" if $next_close == -1;

    if ($next_open != -1 && $next_open < $next_close) {
      # upewnijmy się, że to faktycznie tag <section ...>
      $depth++;
      $pos = $next_open + 8;
      next;
    } else {
      $depth--;
      # znajdź koniec </section ...>
      my $close_end = index($html, '>', $next_close);
      die "FAIL: Uszkodzony tag </section>.\n" if $close_end == -1;
      $pos = $close_end + 1;
      if ($depth == 0) {
        my $end = $pos; # indeks tuż po zamknięciu
        return ($start, $end);
      }
    }
  }
  die "FAIL: Nie udało się wyznaczyć zakresu sekcji case-studies.\n";
}

sub find_h3_positions_in_range {
  my ($html, $from, $to) = @_;
  my @hits;

  my $chunk = substr($html, $from, $to - $from);
  my $offset = $from;

  while ($chunk =~ m/<h3\b[^>]*>(.*?)<\/h3>/sig) {
    my $inner = $1;
    my $t = norm_text($inner);
    my $abs_start = $offset + $-[0];
    my $abs_end   = $offset + $+[0];
    push @hits, { title => $t, h3_start => $abs_start, h3_end => $abs_end };
  }
  return @hits;
}

sub find_wrapper_div_for_h3 {
  my ($html, $h3_start, $h3_end, $range_from, $range_to) = @_;

  # Szukamy najbliższego <div ...> przed h3, który po zbalansowaniu </div> obejmuje h3.
  # Robimy to deterministycznie: iterujemy po wszystkich <div ...> wstecz w obrębie sekcji.
  my $search_from = $range_from;
  my $search_to   = $h3_start;

  my @div_starts;
  my $slice = substr($html, $search_from, $search_to - $search_from);
  while ($slice =~ m/<div\b[^>]*>/sig) {
    push @div_starts, $search_from + $-[0];
  }

  for (my $i = $#div_starts; $i >= 0; $i--) {
    my $div_start = $div_starts[$i];

    # znajdź koniec tagu otwierającego
    my $open_end = index($html, '>', $div_start);
    next if $open_end == -1;

    # zbalansuj divy od tego miejsca aż do końca sekcji
    my $pos = $open_end + 1;
    my $depth = 1;

    while ($pos < $range_to) {
      my $next_open  = index(lc($html), '<div', $pos);
      my $next_close = index(lc($html), '</div', $pos);

      last if $next_close == -1; # nie powinno się zdarzyć, ale fail later

      if ($next_open != -1 && $next_open < $next_close) {
        # upewnijmy się, że to tag <div ...>
        $depth++;
        $pos = $next_open + 4;
        next;
      } else {
        $depth--;
        my $close_end = index($html, '>', $next_close);
        last if $close_end == -1;
        $pos = $close_end + 1;

        if ($depth == 0) {
          my $div_end = $pos; # tuż po </div>
          # Czy ten wrapper obejmuje h3?
          if ($div_start <= $h3_start && $div_end >= $h3_end) {
            return ($div_start, $div_end);
          }
          last;
        }
      }
    }
  }

  die "FAIL: Nie znaleziono wrappera <div> dla <h3> zaczynającego się na pozycji $h3_start.\n";
}

sub must_find_exactly_one_title {
  my ($hits_ref, $title) = @_;
  my @m = grep { $_->{title} eq $title } @$hits_ref;
  if (@m == 0) { die "FAIL: Nie znaleziono <h3> o tytule: [$title]\n"; }
  if (@m > 1)  { die "FAIL: Znaleziono wiele <h3> o tytule: [$title] (ambiwalencja).\n"; }
  return $m[0];
}

# -------------------------
# Main
# -------------------------
my $html = slurp_file($file);
my $snippet = slurp_file($snippet_file);

# Bezpieczne: upewnij się, że snippet wygląda jak blok HTML
$snippet =~ s/^\x{FEFF}//; # BOM
$snippet =~ s/\r\n?/\n/g;

# Zakres sekcji
my ($sec_from, $sec_to) = find_case_studies_section($html);

# Zbierz H3 w sekcji
my @h3 = find_h3_positions_in_range($html, $sec_from, $sec_to);

# Idempotencja / replace: sprawdź, czy nowy tytuł już istnieje
my @already = grep { $_->{title} eq $new_title } @h3;
if (@already) {
  if (!$replace) {
    die "FAIL: Case study [$new_title] już istnieje w #case-studies. (Użyj --replace, jeśli chcesz podmienić.)\n";
  }
}

# Kotwice
my $h3_a1 = must_find_exactly_one_title(\@h3, $anchor1);
my $h3_a2 = must_find_exactly_one_title(\@h3, $anchor2);

# Wrappery dla kotwic
my ($a1_from, $a1_to) = find_wrapper_div_for_h3($html, $h3_a1->{h3_start}, $h3_a1->{h3_end}, $sec_from, $sec_to);
my ($a2_from, $a2_to) = find_wrapper_div_for_h3($html, $h3_a2->{h3_start}, $h3_a2->{h3_end}, $sec_from, $sec_to);

# Sprawdzenie kolejności (deterministycznie)
if ($a2_from <= $a1_from) {
  die "FAIL: Kotwice są w nieoczekiwanej kolejności w dokumencie (anchor2 przed anchor1).\n";
}

my $out = $html;

if (@already && $replace) {
  # Replace istniejącego case study (pierwsze wystąpienie - mamy fail-fast na wiele przez idempotencję, ale tu dopuszczamy wiele?)
  # Fail-fast jeśli więcej niż 1
  if (@already > 1) {
    die "FAIL: Jest więcej niż jedno wystąpienie [$new_title] - --replace byłby niejednoznaczny.\n";
  }
  my $h3_new = $already[0];
  my ($n_from, $n_to) = find_wrapper_div_for_h3($html, $h3_new->{h3_start}, $h3_new->{h3_end}, $sec_from, $sec_to);

  substr($out, $n_from, $n_to - $n_from) = $snippet;
  print "OK: Podmieniono istniejący blok [$new_title] (range $n_from..$n_to)\n";
} else {
  # Insert po drugim wrapperze
  my $insert_at = $a2_to;

  # Małe ułatwienie: jeśli wokół jest brak newline, to dodajemy minimalnie bezpieczne separatory
  my $prefix = "";
  my $suffix = "";
  $prefix = "\n" if $insert_at > 0 && substr($out, $insert_at-1, 1) ne "\n";
  $suffix = "\n" if $snippet !~ /\n\z/;

  substr($out, $insert_at, 0) = $prefix . $snippet . $suffix;
  print "OK: Wstawiono nowy blok po [$anchor2] (insert_at=$insert_at)\n";
}

if ($dry_run) {
  my $tmp = "/tmp/index.html.patched";
  write_file($tmp, $out);
  print "DRY-RUN: Nie zapisano $file. Wygenerowano podgląd: $tmp\n";
  exit 0;
}

if ($backup) {
  my $bak = backup_file($file);
  print "Backup: $bak\n";
}

# Fail-fast: jeśli treść nie zmieniła się, lepiej przerwać (chroni przed pustym snippetem / błędami)
if ($out eq $html) {
  die "FAIL: Wynik identyczny jak wejście (brak zmian). Przerywam bez zapisu.\n";
}

write_file($file, $out);
print "Zapisano: $file\n";
exit 0;
