use strict;
use warnings;
use utf8;
use Test::More;
use open ':std', ':encoding(UTF-8)';

# Load the script
# We use require to load the script. Since we added 'return 1 if caller;',
# it will not execute the main logic.
require "./tools/patch_case_study.pl";

subtest 'norm_text tests' => sub {
    is(norm_text("Simple text"), "Simple text", "Simple text unchanged");
    is(norm_text("  Trim me  "), "Trim me", "Trimming whitespace");
    is(norm_text("<b>Bold</b> <i>Italic</i>"), "Bold Italic", "Removing tags");
    is(norm_text("Multiple   spaces"), "Multiple spaces", "Collapsing spaces");
    is(norm_text("Line\nbreaks"), "Line breaks", "Collapsing newlines");
    is(norm_text("Entities &amp; &lt; &gt; &quot; &#39; &nbsp;"), "Entities & < > \" '", "Decoding basic entities");
    is(norm_text("Numeric &#65; &#x42;"), "Numeric A B", "Decoding numeric and hex entities");
    is(norm_text("Mixed <b>Tags</b> &amp;   Spaces"), "Mixed Tags & Spaces", "Mixed tags, entities and spaces");
    is(norm_text("  <b>  Spaces  </b>  "), "Spaces", "Trimming after tag removal");
    is(norm_text("&#x1F600;"), "😀", "Emoji hex entity");
};

done_testing();
