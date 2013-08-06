package Parser;
use strict;
use warnings;
use Log;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub parse {
    my ($self) = @_;
    my $filename = $self->{filename};
    
    open my $fh, '<', $filename or die $!;
    my @Log_arr = map {
        chomp($_);
        Parser->parse_line($_);
    } <$fh>;
    
    return \@Log_arr;
}

sub parse_line {
    my (undef, $str) = @_;
    my @key_val_strs = split /\t/, $str;
    my @key_val_arr = map {
        my ($label, $value) = /^([a-z]+):(.+)$/;
        if ($value eq "-") {
            ();
        } else {
            ($label, $value)
        }
    } @key_val_strs;
    
    return Log->new(@key_val_arr);
}

1;
