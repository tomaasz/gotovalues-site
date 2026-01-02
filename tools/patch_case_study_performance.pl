#!/usr/bin/env perl
use strict;
use warnings;
use Getopt::Long qw(GetOptions);

my $file    = '';
my $snippet = '';
my $dryrun  = 0;

GetOptions(
  'file=s'    => \$file,
  'snippet=s' => \$snippet,
  'dry-run!'  => \$dryrun,
) or die "Usage: $0 --file index.html --snippet /tmp/case-study-performance.html [--dry-run]\n";

die "❌ --file required\n"    unless $file;
die "❌ --snippet required\n" unless $snippet;

# read inputs
open my $fh, '<', $file or die "❌ Cannot open $file: $!\n";
local $/;
my $html = <$fh>;
close $fh;

open my $sh, '<', $snippet or die "❌ Cannot open $snippet: $!\n";
my $ins = <$sh>;
close $sh;

# do not duplicate
if ($html =~ /Performance\s*\/\s*Dost[eę]pno/s) {
  die "❌ Już istnieje 'Performance / Dostępność' w pliku. Przerywam, żeby nie dublować.\n";
}

# find #case-studies section
my ($before, $cs, $after) = $html =~ m{
  \A(.*?)
  (<section\b[^>]*\bid=(["'])case-studies\3[^>]*>[\s\S]*?<\/section>)
  (.*)\z
}six or die "❌ Nie znalazłem sekcji <section id=\"case-studies\"> ... </section>\n";

# 1) try insert AFTER a known case study heading (text only, no class assumptions)
my $inserted = 0;

for my $anchor (
  qr/Dashboardy\s+wspieraj[aą]ce\s+codzienne\s+decyzje/i,
  qr/Kontrola\s+jako[sś]ci\s+danych\s+i\s+proces[oó]w/i,
) {
  if ($cs =~ s{
    (                                   # [1] capture a whole "case study block"
      <div\b[^>]*\bclass=(["'])[^"']*\bflex\b[^"']*\bpb-12\b[^"']*\2[^>]*>  # wrapper div (flex + pb-12)
      [\s\S]*?
      $anchor
      [\s\S]*?
      </div>                            # end wrapper div
    )
  }{$1\n$ins}six) {
    $inserted = 1;
    last;
  }
}

# 2) fallback: insert before closing </section> of case-studies
if (!$inserted) {
  $cs =~ s{</section>\s*\z}{\n$ins\n</section>\n}six
    or die "❌ Nie udało się wstawić przed </section> w #case-studies\n";
  $inserted = 1;
}

my $out = $before . $cs . $after;

if ($dryrun) {
  print "✅ DRY-RUN: patch wygląda OK (wstawiono snippet do #case-studies)\n";
  exit 0;
}

# backup
my $ts = time;
my $bak = "$file.bak.$ts";
open my $bf, '>', $bak or die "❌ Cannot write backup $bak: $!\n";
print $bf $html;
close $bf;

open my $of, '>', $file or die "❌ Cannot write $file: $!\n";
print $of $out;
close $of;

print "✅ Zrobione. Backup: $bak\n";
