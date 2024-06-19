import Dashboard from "components/dashboard/Dashboard";
import DistributorsList from "components/distributors-list/DistributorsList"
import ReportsList from "components/reports-list/ReportsList"

import ReportsListTable from "components/ReportsListTable/ReportsListTable"



export function DashboardPage(){
    return ( 
        <Dashboard/>
    )
}

export function ReportsPage(){
    return ( 
        <ReportsList/>
    )
}

export function DistributorsPage(){
    return ( 
        <DistributorsList/>
    )
}

export function NotificationPage(){
    return <div></div>
}