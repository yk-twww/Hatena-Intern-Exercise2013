package Log;
use strict;
use warnings;
use Time::Piece;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub protocol {
    my ($self) = @_;
    my $req_str = $self->{req};
    
    $req_str =~ /(\S+)$/;
    
    return $1;
}

sub method {
    my ($self) = @_;
    my $req_str = $self->{req};
    
    $req_str =~ /^(\S+)/;
    
    return $1;
}

sub path {
    my ($self) = @_;
    my $req_str = $self->{req};
    
    $req_str =~ /^\S+\s(\S+)/;
    
    return $1;
}

sub uri {
    my ($self) = @_;
    my ($host, $path) = ($self->{host}, $self->path);
    
    return "http://" . $host . $path;
}

sub time {
    my ($self) = @_;
    my $epoch = $self->{epoch};
    my $t = Time::Piece->strptime($epoch, '%s');
    
    return $t->datetime;
}

1;
