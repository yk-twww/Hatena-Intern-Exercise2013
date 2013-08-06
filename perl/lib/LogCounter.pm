package LogCounter;
use strict;
use warnings;

sub new {
    my ($class, $logs) = @_;
    return bless { logs => $logs }, $class;
};

sub group_by_user {
    my ($self) = @_;
    my %group_hash;
    
    foreach my $log_obj ( @{ $self->{logs} } ) {
        my $group_name = $log_obj->{user} || "guest";
        push @{ $group_hash{$group_name} }, $log_obj;
    }
    
    return \%group_hash;
}

sub count_error {
    my ($self) = @_;
    my $error_num = grep {
        my $status = $_->{status};
        $status =~ /^5/;
    } @{ $self->{logs} };
    
    return $error_num;
}

1;
