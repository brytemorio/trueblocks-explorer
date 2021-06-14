import { PageHeader, Tabs } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  DashboardAccountsLocation,
  DashboardCollectionsLocation, DashboardIndexesLocation, DashboardMonitorsLocation, DashboardOverviewLocation
} from '../../locations';
import { cookieVars } from '../../utils';
import { Collections } from './Tabs/Collections';
import { Indexes } from './Tabs/Indexes';
import { Monitors } from './Tabs/Monitors';
import { Overview } from './Tabs/Overview';

const { TabPane } = Tabs;

// const Accounts = () => (location.pathname === DashboardIndexesLocation ? <TabPane tab="Accounts" key={DashboardIndexesLocation}><div>Shit</div></TabPane> : <><div>Shat</div></>);
const Accounts = () => <div>Display accounting on an address</div>;

export const DashboardView = () => {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState(
    Cookies.get(cookieVars.dashboard_current_tab) || DashboardOverviewLocation
  );

  const onTabChange = (key: string) => {
    Cookies.set(cookieVars.dashboard_current_tab, key);
    history.push(key);
    setCurrentTab(key);
  };

  const location = useLocation();
  const title = 'Dashboard';

  var tabs = [
    {name: "Overview", location: DashboardOverviewLocation, component: <Overview />, disabled: false},
    {name: "Accounts", location: DashboardAccountsLocation, component: <Accounts />, disabled: true},
    {name: "Monitors", location: DashboardMonitorsLocation, component: <Monitors />, disabled: false},
    {name: "Collections", location: DashboardCollectionsLocation, component: <Collections />, disabled: false},
    {name: "Indexes", location: DashboardIndexesLocation, component: <Indexes />, disabled: false},
  ]
  if (location.pathname === DashboardAccountsLocation)
    tabs[1].disabled = false;

  return (
    <>
      <Link to={DashboardAccountsLocation} onChange={(key) => onTabChange(DashboardAccountsLocation)}>Link</Link>
      <PageHeader title={title} />
      <Tabs defaultActiveKey={currentTab} onChange={(key) => onTabChange(key)}>
        {tabs.map((tab) => (
          <TabPane tab={tab.name} key={tab.location} disabled={tab.disabled}>
            {tab.component}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};
