import React, { useState } from "react";
import Footer from "./Footer";
import StripeCheckout from "react-stripe-checkout";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Swal from "sweetalert2";
const SubscribePage = () => {
  const [user] = useAuthState(auth);
  const subscriptionData = [
    {
      name: "pro_karaoke_party",
      duration: 2,
      price: 15,
    },
    {
      name: "pro_karaoke",
      duration: 30,
      price: 28.41,
    },
    {
      name: "pro_karaoke_365",
      duration: 365,
      price: 198,
    },
  ];

  const handlePurchase = (subscriptionType) => {
    switch (subscriptionType) {
      case "pro_karaoke_party":
        alert("You purchased PRO KARAOKE PARTY");
        break;
      case "pro_karaoke":
        alert("You purchased PRO KARAOKE");
        break;
      case "pro_karaoke_365":
        alert("You purchased PRO KARAOKE 365");
        break;
      default:
        break;
    }
  };
  const onToken = async (data, token) => {
    try {
      console.log(data, token);
      const response = await fetch(
        "http://localhost:5004/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planId: data.name,
            token: token.id,
            email: user.email,
            data: data,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        // Payment successful
        Swal.fire({
          title: "Success!",
          text: "Subscription added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        // Payment failed
        Swal.fire({
          title: "Error!",
          text: "Failed to Purchase. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div className=" navcolor pt-5 mt-5">
      <div className="card container ">
        <div className="text-center mb-5">
          <h3 style={{ fontFamily: "Roboto", fontSize: "34px" }}>
            Choose a subscription plan
          </h3>
          <p style={{ fontFamily: "Roboto", fontSize: "20px" }}>
            Each plan includes unlimited access to the full Video Karaoke
            catalog (over 3500)
          </p>
        </div>

        <div className="text-center mb-4">
          <h1
            className="text-uppercase  fw-bold text-danger"
            style={{ fontFamily: "Roboto", fontSize: "50px" }}
          >
            MORNA KARAOKE
          </h1>
          <p
            className="mb-4 text-bold fs-4"
            style={{ fontFamily: "Roboto", fontSize: "24px" }}
          >
            For Professional use - Karaoke bars, DJs, restaurants, hotels, etc.
          </p>
        </div>

        <div className="mb-4">
          <h5
            className="mb-3 text-danger  shadow-lg"
            style={{ fontFamily: "Roboto", fontSize: "24px" }}
          >
            KARAOKE PRO PLANS INCLUDE:
          </h5>
          <ul className="list-unstyled row">
            <li className="col-md-6 mb-3">
              <div className="card h-100 p-3 border border-secondary shadow-lg">
                <h5
                  className="card-title"
                  style={{ fontFamily: "Roboto", fontSize: "24px" }}
                >
                  Unlimited access to every available Video Karaoke
                </h5>
                <p className="card-text">Key Transpose</p>
                <p className="card-text">
                  Always up-to-date list available for Excel download
                </p>
              </div>
            </li>
            <li className="col-md-6 mb-3">
              <div className="card h-100 p-3 border border-secondary shadow-lg">
                <h5
                  className="card-title"
                  style={{ fontFamily: "Roboto", fontSize: "24px" }}
                >
                  On screen display for next performer info
                </h5>
                <p className="card-text">Customizable playlist support</p>
                <p className="card-text">Fullscreen Karaoke</p>
              </div>
            </li>
            <li className="col-md-6 mb-3">
              <div className="card h-100 p-3 border border-secondary shadow-lg">
                <h5
                  className="card-title"
                  style={{ fontFamily: "Roboto", fontSize: "24px" }}
                >
                  Multi TV Karaoke
                </h5>
                <p className="card-text">Code# search support</p>
                <p className="card-text">Technical Support priority</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div
              className="card mb-4 shadow custom-card"
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <div
                className="card-header"
                style={{
                  backgroundColor: "#d3d3d3",
                  borderBottom: "1px solid #ccc",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                <h4
                  className="my-0 fw-normal"
                  style={{ fontFamily: "Roboto", fontSize: "24px" }}
                >
                  PRO KARAOKE PARTY
                </h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">12.90€</h1>
                <p className="text-muted">48h Access</p>

                <StripeCheckout
                  token={(token) => onToken(subscriptionData[0], token)}
                  amount={1000000}
                  currency="USD"
                  stripeKey="pk_test_51OyvNiDCEZCuRipiSIuuNTzFVHDUkrSzsCUt6bYQYtH0csNO6DaYtU5hO2FzrDwn5CsUsUOS1WNVbyGIYEFymqwN00irG6xOXi"
                >
                  <button
                    type="button"
                    className="w-100 btn btn-lg custom-btn"
                    style={{
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                    }}
                  >
                    Purchase
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card mb-4 shadow custom-card"
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <div
                className="card-header"
                style={{
                  backgroundColor: "#d3d3d3",
                  borderBottom: "1px solid #ccc",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                <h4
                  className="my-0 fw-normal"
                  style={{ fontFamily: "Roboto", fontSize: "24px" }}
                >
                  PRO KARAOKE
                </h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                  24.90€ / month
                </h1>
                <p className="text-muted">Monthly Subscription</p>
                <p className="text-muted">1 Month access</p>
                <button
                  type="button"
                  className="w-100 btn btn-lg custom-btn"
                  style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card mb-4 shadow custom-card"
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <div
                className="card-header"
                style={{
                  backgroundColor: "#d3d3d3",
                  borderBottom: "1px solid #ccc",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                <h4
                  className="my-0 fw-normal"
                  style={{ fontFamily: "Roboto", fontSize: "24px" }}
                >
                  PRO KARAOKE 365
                </h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">170.00€</h1>
                <p className="text-muted">1 Year access</p>
                <button
                  type="button"
                  className="w-100 btn btn-lg custom-btn"
                  style={{ backgroundColor: "#ffc107", borderColor: "#ffc107" }}
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubscribePage;
