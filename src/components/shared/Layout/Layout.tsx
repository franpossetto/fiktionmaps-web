import { useState } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <Content/>
  </>
  );
}