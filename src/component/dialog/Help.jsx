import React from "react";

const FAQ = () => {
  return (
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
  );
};

const faqData = [
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt sapien nec eros finibus molestie.",
    answer:
      "Donec rhoncus lorem ut elit cursus ullamcorper. Praesent bibendum id dolor eget maximus. Etiam vitae facilisis velit. Morbi tincidunt auctor orci, ac vestibulum sem dapibus at. Nulla placerat viverra risus ut pretium. Sed ultricies ornare est non tempus. Nulla facilisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim nec augue id varius.",
  },
  {
    question: "Ut non lacus sodales, facilisis metus eu, mollis sem.?",
    answer:
      "Donec commodo ultricies tempus. Vivamus facilisis vitae libero sit amet cursus. Mauris tincidunt eleifend enim, in lacinia eros imperdiet vel. Aliquam est ex, finibus at volutpat nec, ullamcorper eget odio. Nullam sit amet posuere mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ultricies porttitor purus commodo tincidunt. Nullam tortor magna, efficitur vel purus at, lobortis tristique lacus. Nulla a euismod nisi, a molestie diam. Quisque at ex aliquam, sodales est eget, hendrerit urna. Maecenas vehicula tellus mollis diam euismod hendrerit.",
  },
  {
    question:
      "Duis nec egestas justo. Proin venenatis accumsan tellus, non volutpat ipsum pellentesque et. ?",
    answer:
      "Fusce feugiat elit a tellus dapibus eleifend. Nulla et nisi enim. Vivamus imperdiet quam nibh, ut dignissim sem elementum quis. Nunc quis magna dui. Fusce elit erat, tincidunt sit amet orci sed, lobortis rutrum turpis. In lobortis purus at diam egestas, ac dignissim velit maximus. Maecenas quis dui eget erat tincidunt faucibus. Nulla facilisi. Proin at est pellentesque, cursus orci sit amet, feugiat nunc. Vestibulum semper sagittis lacus, et posuere lectus congue maximus.",
  },
  {
    question:
      "Duis nec egestas justo. Proin venenatis accumsan tellus, non volutpat ipsum pellentesque et. ?",
    answer:
      "Fusce feugiat elit a tellus dapibus eleifend. Nulla et nisi enim. Vivamus imperdiet quam nibh, ut dignissim sem elementum quis. Nunc quis magna dui. Fusce elit erat, tincidunt sit amet orci sed, lobortis rutrum turpis. In lobortis purus at diam egestas, ac dignissim velit maximus. Maecenas quis dui eget erat tincidunt faucibus. Nulla facilisi. Proin at est pellentesque, cursus orci sit amet, feugiat nunc. Vestibulum semper sagittis lacus, et posuere lectus congue maximus.",
  },
  {
    question:
      "Duis nec egestas justo. Proin venenatis accumsan tellus, non volutpat ipsum pellentesque et. ?",
    answer:
      "Fusce feugiat elit a tellus dapibus eleifend. Nulla et nisi enim. Vivamus imperdiet quam nibh, ut dignissim sem elementum quis. Nunc quis magna dui. Fusce elit erat, tincidunt sit amet orci sed, lobortis rutrum turpis. In lobortis purus at diam egestas, ac dignissim velit maximus. Maecenas quis dui eget erat tincidunt faucibus. Nulla facilisi. Proin at est pellentesque, cursus orci sit amet, feugiat nunc. Vestibulum semper sagittis lacus, et posuere lectus congue maximus.",
  },
];

export default FAQ;
