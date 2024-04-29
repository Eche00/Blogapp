import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { GitHub, Instagram, LinkedIn } from "@mui/icons-material";

function FooterComp() {
  return (
    <Footer container className=" border border-t-8 border-teal-500 mt-32">
      <div className=" w-full max-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
          {/*logo*/}

          <div className=" my-5">
            <Link
              to="/"
              className=" self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
              <span className=" p-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white dark:text-black">
                𝕏
              </span>{" "}
              -ßlog
            </Link>
          </div>
          {/*footer titles*/}
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <div>
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer">
                    100 JS Projects
                  </Footer.Link>
                </Footer.LinkGroup>

                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer">
                    Portfolio Web
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
            {/** follow us */}
            <div>
              <Footer.Title title="Follow us" />
              <div>
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer">
                    Github <GitHub fontSize="small" />
                  </Footer.Link>
                </Footer.LinkGroup>

                <Footer.LinkGroup col>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer">
                    Instagram <Instagram fontSize="small" />
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
            {/** Legal */}
            <div>
              <Footer.Title title="Legal" />
              <div>
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Privacy</Footer.Link>
                </Footer.LinkGroup>

                <Footer.LinkGroup col>
                  <Footer.Link href="#">Terms & Condition</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between ">
          <div>
            <Footer.Copyright
              href=""
              by="𝕏eche_codes"
              year={new Date().getFullYear()}
            />
          </div>
          <div className=" flex  items-center gap-6 mt-4 sm:mt-2 sm:justify-center">
            <Footer.Icon href="" icon={GitHub} />
            <Footer.Icon href="" icon={Instagram} />
            <Footer.Icon href="" icon={LinkedIn} />
            <p className=" text-2xl font-semibold ">𝕏</p>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComp;
