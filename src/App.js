import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Overview, Documentation, ChangeLog, Error } from "./pages/supports";
import { Avatars, Alerts, Buttons, Charts, Tables, Fields, Headings, Colors } from "./pages/blocks";
import { Ecommerce, Analytics, CRM, ForgotPassword, Register, Login,UserLog,Device, UserProfile, MyAccount, 
    ProductList, ProductView, ProductUpload, InvoiceList, InvoiceDetails, OrderList, Message, Editdevices, MapPage, Edituser,Addresslist,
    Notification,  Settings } from "./pages/master";
import AddProperty from "./pages/master/AddProperty"
import UserList from "./pages/master/UserList";
import LiveRentalList from "./pages/master/LiveRentalList"
import Devices from "./pages/master/Devices";
import DeviceDashboard from "./pages/master/DeviceDashboard";
export default function App() {
    return (
        <ThemeProvider>
            <LoaderProvider>
                <BrowserRouter>
                    <Routes>
                        {/* master Pages */}
                        <Route path="/analytics" element={<Analytics /> }/>
                         {/* <Route path="/ecommerce" element={<Ecommerce /> } />
                         <Route path="/analytics" element={<Analytics /> }/>
                        <Route path="/crm" element={<CRM /> } />  */}
                        <Route path="/" element={<Login />} />
                        <Route path="/add-property" element={<AddProperty />} />
                        {/* <Route path="/register" element={<Register />} />*/}
                        <Route path="/user-list" element={<UserList />} />
                        <Route path="/live-rentalList" element={<LiveRentalList />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/user-log" element={<UserLog />} />
                        {/* <Route path="/device" element={<Device />} />
                         <Route path="/user-profile" element={<UserProfile />} /> */}
                        <Route path="/my-account" element={<MyAccount />} />
                        {/* <Route path="/product-list" element={<ProductList />} />
                        <Route path="/product-view" element={<ProductView />} />
                        <Route path="/product-upload" element={<ProductUpload />} />
                        <Route path="/invoice-list" element={<InvoiceList />} />
                        <Route path="/invoice-details" element={<InvoiceDetails />} />
                        <Route path="/order-list" element={<OrderList />} />
                        <Route path="/message" element={<Message />} />
                        <Route path="/notification" element={<Notification />} /> 
                        <Route path="/settings" element={<Settings />} /> */}
                        <Route path="/Devices" element={<Devices />} />
                        <Route path="/edit-devices/:devices_id" element={<Editdevices/>}/>
                        <Route path="/edit-user/:email" element={<Edituser/>}/>
                        <Route path="/MapPage" element={<MapPage/>}/>
                        <Route path="/MapPage/:coords" component={MapPage} />
                        
                        <Route path="/dashboard/:devices_id" element={<DeviceDashboard />} />
                        <Route path="/address/:devices_id" element={<Addresslist />} />
                    </Routes>
                </BrowserRouter>
            </LoaderProvider>
        </ThemeProvider>
    );
}

