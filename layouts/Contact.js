import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true); // Set sending state to true

    emailjs
      .sendForm('service_j05gthp', 'template_2292229', form.current, 'FFejW-HINLmbe72bF')
      .then(
        () => {
          console.log('SUCCESS!');
          setIsSending(false); // Reset sending state
        },
        (error) => {
          console.log('FAILED...', error.text);
          setIsSending(false); // Reset sending state
        },
      );
  };

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            <form ref={form} className="contact-form" onSubmit={sendEmail}>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="user_name"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="user_email"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  name="message"
                  placeholder="Your message"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Now'}
              </button>
            </form>
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
