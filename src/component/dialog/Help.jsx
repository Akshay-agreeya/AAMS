import React from "react";
import Layout from "../Layout";

const Help = () => {
  return (
    <Layout>
      <div className="adaMainContainer">
    <section className="adminControlContainer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="pageTitle">
              <h1>FAQ</h1>
            </div>
          </div>
          <div className="col-12">
            <div className="faqContainer">
              <div className="accordion" id="faqAccordion">
                {faqData.map((faq, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className={`accordion-button ${
                          index !== 0 ? "collapsed" : ""
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded={index === 0 ? "true" : "false"}
                        aria-controls={`collapse${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className={`accordion-collapse collapse ${
                        index === 0 ? "show" : ""
                      }`}
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    </Layout>
  );
};

const faqData = [
  {
    question:
      "What is WCAG?",
    answer:
      "WCAG stands for Web Content Accessibility Guidelines. It's a set of international standards developed by the W3C to make web content more accessible to people with disabilities, including those with blindness, low vision, deafness, cognitive limitations, and more.",
  },
  {
    question: "Why is WCAG important for websites and apps?",
    answer:
      "WCAG ensures that digital content is usable by everyone, including people with disabilities. It helps improve usability, legal compliance, and overall user experience across devices and platforms."},
  {
    question:
      "What are the WCAG principles ?",
    answer:
      "WCAG is based on four key principles: Perceivable, Operable, Understandable, and Robust (POUR). These principles guide how to make content accessible in a meaningful and functional way."},
  {
    question:
      "What are the different levels of WCAG compliance?",
    answer:
      `Level A: Basic accessibility features   ,  Level AA: Deals with the biggest and most common barriers (often the legal standard)   ,  Level AAA: The highest level of accessibility (often not required for all content)`},
  // {
  //   question:
  //     "Duis nec egestas justo. Proin venenatis accumsan tellus, non volutpat ipsum pellentesque et. ?",
  //   answer:
  //     "Fusce feugiat elit a tellus dapibus eleifend. Nulla et nisi enim. Vivamus imperdiet quam nibh, ut dignissim sem elementum quis. Nunc quis magna dui. Fusce elit erat, tincidunt sit amet orci sed, lobortis rutrum turpis. In lobortis purus at diam egestas, ac dignissim velit maximus. Maecenas quis dui eget erat tincidunt faucibus. Nulla facilisi. Proin at est pellentesque, cursus orci sit amet, feugiat nunc. Vestibulum semper sagittis lacus, et posuere lectus congue maximus.",
  // },
];

export default Help;
