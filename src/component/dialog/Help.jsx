import React from "react";
import Layout from "../Layout";
import helpPDF from "./pdf/help.pdf";
import supportPDF from "./pdf/support.pdf";

const Help = () => {
  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            {/* Section 1 - Help Guide */}
            <div className="help-section">
              <h2>Help Guide</h2>
              <p>
                Here you will find instructions on how to use the tool
                effectively. Please go through the Help Guide PDF for a detailed
                explanation.
              </p>
              <a href={helpPDF} target="_blank" rel="noopener noreferrer">
                📄 Download Help PDF
              </a>
            </div>

            <hr />

            {/* Section 2 - Support Guide */}
            <div className="support-section">
              <h2>Support Guide</h2>
              <p>
                If you face any issues, you can refer to the Support Guide for
                troubleshooting steps and escalation process.
              </p>
              <a href={supportPDF} target="_blank" rel="noopener noreferrer">
                📄 Download Support PDF
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Help;

// const faqData = [
//   {
//     question:
//       "What is WCAG?",
//     answer:
//       "WCAG stands for Web Content Accessibility Guidelines. It's a set of international standards developed by the W3C to make web content more accessible to people with disabilities, including those with blindness, low vision, deafness, cognitive limitations, and more.",
//   },
//   {
//     question: "Why is WCAG important for websites and apps?",
//     answer:
//       "WCAG ensures that digital content is usable by everyone, including people with disabilities. It helps improve usability, legal compliance, and overall user experience across devices and platforms."},
//   {
//     question:
//       "What are the WCAG principles ?",
//     answer:
//       "WCAG is based on four key principles: Perceivable, Operable, Understandable, and Robust (POUR). These principles guide how to make content accessible in a meaningful and functional way."},
//   {
//     question:
//       "What are the different levels of WCAG compliance?",
//     answer:
//       `Level A: Basic accessibility features   ,  Level AA: Deals with the biggest and most common barriers (often the legal standard)   ,  Level AAA: The highest level of accessibility (often not required for all content)`},
//   // {
//   //   question:
//   //     "Duis nec egestas justo. Proin venenatis accumsan tellus, non volutpat ipsum pellentesque et. ?",
//   //   answer:
//   //     "Fusce feugiat elit a tellus dapibus eleifend. Nulla et nisi enim. Vivamus imperdiet quam nibh, ut dignissim sem elementum quis. Nunc quis magna dui. Fusce elit erat, tincidunt sit amet orci sed, lobortis rutrum turpis. In lobortis purus at diam egestas, ac dignissim velit maximus. Maecenas quis dui eget erat tincidunt faucibus. Nulla facilisi. Proin at est pellentesque, cursus orci sit amet, feugiat nunc. Vestibulum semper sagittis lacus, et posuere lectus congue maximus.",
//   // },
// ];
