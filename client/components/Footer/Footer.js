import React from "react";

import FooterColumn from "../FooterColumn";

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

import "./Footer.scss";


export default () => {
  return (
    <div className="footer">
      <div className="company">
        <FooterColumn data={companyColumn} />
      </div>
      <div className="customer-care">
        <FooterColumn data={customerCareColumn} />
      </div>
      <div className="contact-us">
        <FooterColumn data={contactUs} />
        <div className="icon-container">
          <InstagramIcon 
            fontSize="large" 
            color="action" 
            sx={{ margin: "10px 5px 5px 0" }} 
          />
          <FacebookIcon 
            fontSize="large" 
            color="action" 
            sx={{ margin: "10px 5px 5px 0" }} 
          />
          <TwitterIcon 
            fontSize="large" 
            color="action" 
            sx={{ margin: "10px 5px 5px 0" }} 
          />
        </div>
      </div>
    </div>
  );
};

const companyColumn = {
  title: "Company",
  items: [
    { title: "About" },
    { title: "Press" },
    { title: "Careers" },
  ],
};

const customerCareColumn = {
  title: "Customer Care",
  items: [
    { title: "Track Order" },
    { title: "Return" },
    { title: "FAQs" },
    { title: "Contact Us" },
  ],
};

const contactUs ={
  title: "Contact Us",
  items: [
    { title: "Sweet Shopper" },
    { title: "customer@sweetshopper.com" },
    { title: "+1 123-456-7890" },
  ]
}
