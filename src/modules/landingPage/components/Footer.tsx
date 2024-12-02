import Logo from "components/Logo";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto landingPagecontainer px-6 py-5 lg:px-8 lg:py-16">
        <div className=" lg:grid lg:grid-cols-3  ">
          <div className="space-y-8">
            <Logo variant="3" width="212px" height="105px" />
            <p className="text-balance text-sm/6 ">
              Yield – Begin your journey to financial growth
            </p>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 gap-8 lg:gap-4 lg:col-span-2 lg:mt-0  ">
            <div className="lg:grid lg:grid-cols-2 ">
              <div className="col-span-1 lg:col-span-2 block xl:hidden ">
                <h3 className="text-lg font-semibold text-gray-950 lg:text-right">
                  Contact Us
                </h3>
                <ul role="list" className="mt-4 space-y-2 lg:text-right">
                  {navigation.ContactUs.map((item) => (
                    <li key={item.name}>
                      <p className=" text-gray-600 hover:text-gray-900 ">
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2">
              <div className="hidden xl:block ">
                <h3 className="text-lg font-semibold text-gray-950 lg:text-right">
                  Contact Us
                </h3>
                <ul role="list" className="mt-4 space-y-2 lg:text-right">
                  {navigation.ContactUs.map((item) => (
                    <li key={item.name}>
                      <p className=" text-gray-600 hover:text-gray-900 ">
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-1 lg:col-span-2 xl:col-auto">
                <h3 className="text-lg font-semibold text-gray-950 lg:text-right">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-2 lg:text-right">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        target="_blank"
                        href={item.href}
                        className=" text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-900/10 pt-8 lg:flex lg:items-center lg:justify-between">
          <div className="flex gap-x-6 lg:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                className="text-gray-600 hover:text-gray-800"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-gray-600 lg:order-1 lg:mt-0">
            Copyright &copy; Credit Direct Finance Company Limited. Authorized
            and regulated by the CBN.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const navigation = {
  ContactUs: [
    {
      name: "Address: 48/50 Isaac John Street, GRA, Ikeja, Lagos, Nigeria.",
      href: "#",
    },
    { name: "Email: contact@creditdirect.ng", href: "#" },
    { name: "Phone: 0700CREDITDIRECT, 02014482225, 02017005120", href: "#" },
    { name: "Whatsapp: 09070309430", href: "#" },
  ],
  company: [
    { name: "About", href: "https://www.creditdirect.ng/about-us/" },
    { name: "Legal", href: "/terms-and-conditions" },
    {
      name: "Privacy policy",
      href: "https://www.creditdirect.ng/privacy-policy/",
    },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/creditdirectltd/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://www.twitter.com/creditdirectltd",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          {...props}
        >
          <path
            fill="currentColor"
            d="M7.91 20.889c8.302 0 12.845-6.885 12.845-12.845c0-.193 0-.387-.009-.58A9.2 9.2 0 0 0 23 5.121a9.2 9.2 0 0 1-2.597.713a4.54 4.54 0 0 0 1.99-2.5a9 9 0 0 1-2.87 1.091A4.5 4.5 0 0 0 16.23 3a4.52 4.52 0 0 0-4.516 4.516c0 .352.044.696.114 1.03a12.82 12.82 0 0 1-9.305-4.718a4.526 4.526 0 0 0 1.4 6.03a4.6 4.6 0 0 1-2.043-.563v.061a4.524 4.524 0 0 0 3.62 4.428a4.4 4.4 0 0 1-1.189.159q-.435 0-.845-.08a4.51 4.51 0 0 0 4.217 3.135a9.05 9.05 0 0 1-5.608 1.936A9 9 0 0 1 1 18.873a12.84 12.84 0 0 0 6.91 2.016"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/yieldbycreditdirect/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/11500510",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 1024 1024"
          {...props}
        >
          <path
            fill="currentColor"
            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32M349.3 793.7H230.6V411.9h118.7zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8m503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2c-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7c120.2 0 142.3 79.1 142.3 181.9z"
          />
        </svg>
      ),
    },
  ],
};
