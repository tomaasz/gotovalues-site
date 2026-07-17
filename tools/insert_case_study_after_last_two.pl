#!/usr/bin/env perl
use strict;
use warnings;
use Getopt::Long;
use File::Copy qw(copy);

my ($file, $snippet, $dry_run);
GetOptions(
  'file=s'    => \$file,
  'snippet=s' => \$snippet,
  'dry-run'   => \$dry_run,
) or die "❌ Złe parametry\n";

die "❌ Brak --file\n"    unless $file;
die "❌ Brak --snippet\n" unless $snippet;

open my $fh, '<', $file or die "❌ Nie mogę otworzyć $file\n";
local $/;
my $html = <$fh>;
close $fh;

open my $sh, '<', $snippet or die "❌ Nie mogę otworzyć $snippet\n";
my $new_block = <$sh>;
close $sh;

# Tytuły referencyjne (KOLEJNOŚĆ MA ZNACZENIE)
my @anchors = (
  'Kontrola jakości danych i procesów',
  'Dashboardy wspierające codzienne decyzje',
);

my $pos = 0;

for my $title (@anchors) {
  if ($html =~ m{
      (<div\b[^>]*\bflex\b[^>]*pb-12[^>]*>   # wrapper
       .*?
       <h3\b[^>]*>\Q$title\E</h3>
       .*?
       </div>)
  }six) {
    $pos = pos($html) = $+[0];
  } else {
    die "❌ Nie znalazłem case study z tytułem: $title\n";
  }
}

die "❌ Nie ustalono miejsca wstawienia\n" unless $pos;

my $out = substr($html, 0, $pos)
        . "\n\n$new_block\n\n"
        . substr($html, $pos);

if ($dry_run) {
  print "✅ DRY-RUN OK — nowy case study zostałby wstawiony po 2 ostatnich.\n";
  exit 0;
}

# backup
my $bak = "$file.bak." . time;
copy($file, $bak) or die "❌ Backup nieudany\n";

open my $of, '>', $file or die "❌ Nie mogę zapisać $file\n";
print $of $out;
close $of;

print "✅ Wstawiono nowy case study\n";
print "🧷 Backup: $bak\n";
