package com.customermaster;

public class CustomerStatistics {

    private long totalCustomers;
    private long activeRecords;
    private long addedToday;
    private long deletedRecords;


    public CustomerStatistics() {
    }


    public CustomerStatistics(
            long totalCustomers,
            long activeRecords,
            long addedToday,
            long deletedRecords) {

        this.totalCustomers = totalCustomers;
        this.activeRecords = activeRecords;
        this.addedToday = addedToday;
        this.deletedRecords = deletedRecords;
    }


    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }


    public long getActiveRecords() {
        return activeRecords;
    }

    public void setActiveRecords(long activeRecords) {
        this.activeRecords = activeRecords;
    }


    public long getAddedToday() {
        return addedToday;
    }

    public void setAddedToday(long addedToday) {
        this.addedToday = addedToday;
    }


    public long getDeletedRecords() {
        return deletedRecords;
    }

    public void setDeletedRecords(long deletedRecords) {
        this.deletedRecords = deletedRecords;
    }
}