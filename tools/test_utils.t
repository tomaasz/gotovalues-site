#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use Test::More;
use open ':std', ':encoding(UTF-8)';

# Ensure we can load the script
require './tools/patch_case_study.pl';

subtest 'decode_entities_basic' => sub {
    is(decode_entities_basic('&nbsp;'),  ' ', 'nbsp entity');
    is(decode_entities_basic('&amp;'),   '&', 'amp entity');
    is(decode_entities_basic('&lt;'),    '<', 'lt entity');
    is(decode_entities_basic('&gt;'),    '>', 'gt entity');
    is(decode_entities_basic('&quot;'),  '"', 'quot entity');
    is(decode_entities_basic('&#39;'),   "'", 'apos entity');

    is(decode_entities_basic('&NBSP;'),  ' ', 'case insensitive entity (NBSP)');
    is(decode_entities_basic('&AMP;'),   '&', 'case insensitive entity (AMP)');

    is(decode_entities_basic('&#65;'),   'A', 'decimal numeric entity');
    is(decode_entities_basic('&#x41;'),  'A', 'hex numeric entity');
    is(decode_entities_basic('&#x1F600;'), '😀', 'hex numeric emoji');

    is(decode_entities_basic('Hello&nbsp;World &amp; &lt;others&gt;'),
       'Hello World & <others>', 'mixed content');

    is(decode_entities_basic('No entities here'), 'No entities here', 'no entities');
};

subtest 'norm_text' => sub {
    is(norm_text('  <h3>Hello</h3>  '), 'Hello', 'strips h3 tags and trims');
    is(norm_text('<b>Bold</b> &amp; <i>Italic</i>'), 'Bold & Italic', 'strips tags and decodes');
    is(norm_text("Line\nBreak"), 'Line Break', 'normalizes whitespace');
    is(norm_text('   '), '', 'trims only-whitespace string');
};

done_testing();
