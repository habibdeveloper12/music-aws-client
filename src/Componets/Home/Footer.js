import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text">

            <p className=" text-white mt-2">Licenses purchased on this website are EXCLUSIVELY for private use. If karaoke content, whose licenses are acquired here, is used in live public spaces, the establishments/places where karaoke takes place must have Public Performance Licenses from SCM (Sociedade Caboverdiana da Musica).</p>
            <div className="mt-4">
              <p>Follow us:</p>
              <p className="mb-0">© 2021 MORNA KARAOKE. All rights reserved.</p>
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-3"><a href="#" className="text-decoration-none text-white"><i className="bi bi-facebook"></i></a></li>
                <li className="list-inline-item me-3"><a href="#" className="text-decoration-none text-white"><i className="bi bi-twitter"></i></a></li>
                <li className="list-inline-item me-3"><a href="#" className="text-decoration-none text-white"><i className="bi bi-instagram"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <div>
              <li style={{ fontFamily: 'Roboto', fontSize: '24px' }}>Accept payment</li>
              <img src="../payment.png" alt="footer" style={{ width: "60%", height: "auto" }} />
              </div>

            </ul>
            <p className="mt-3">Contact: mayolution@gmail.com / +238 9502169</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
