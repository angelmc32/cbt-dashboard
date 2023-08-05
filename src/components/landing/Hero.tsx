import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "../buttons";

const Hero = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden">
      <div className="mx-auto w-full px-4 md:px-16 lg:mx-0 lg:flex lg:items-start lg:px-12 lg:pt-24 xl:px-16 xl:pt-24">
        <div className="w-full pt-20 md:w-3/4 lg:w-3/5 lg:max-w-xl lg:shrink-0 lg:pt-0 xl:ml-8 xl:max-w-2xl">
          <h3 className="mb-2 text-3xl text-white md:text-4xl md:leading-tight">
            Connect with your members and boost your engagement
          </h3>
          <h1 className="mb-2 ml-4 text-5xl font-bold text-poc_yellowPrimary-500 md:text-7xl md:leading-none">
            Proof of Community
          </h1>
          <div className="flex mt-8 w-full flex-col items-center gap-x-6 gap-y-6 md:mb-4 md:ml-8 md:mt-4 md:flex-row lg:mt-8 lg:justify-center lg:w-4/5 lg:ml-4">
            <Link href="/join">
              <PrimaryButton size="xl">Create yours!</PrimaryButton>
            </Link>
            <Link
              href="/communities"
              className="text-xl font-medium text-white"
            >
              <span
                className="relative my-3 decoration-primary before:absolute before:-bottom-1.5 before:left-0 before:block before:h-[2px] 
          before:w-full before:origin-top-left before:scale-x-0
          before:bg-primary before:transition before:duration-300
          before:ease-in-out before:content-[''] before:hover:scale-x-100"
              >
                Explore communities
              </span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:-ml-16 lg:mt-0 lg:pl-0 xl:-ml-16 xl:-mt-32">
          <div className="-mt-12 ml-auto w-44 flex-none space-y-8 sm:ml-0 sm:pt-80 lg:pt-64 xl:pt-80">
            <div className="relative h-44">
              <Image
                src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                alt=""
                className="aspect-square w-full rounded-full bg-gray-900/5 object-cover shadow-lg"
                fill
                sizes="11rem"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="relative h-44">
              <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                alt=""
                className="aspect-square w-full rounded-full bg-gray-900/5 object-cover shadow-lg"
                fill
                sizes="11rem"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
            </div>
          </div>
          <div className="mr-auto w-44 flex-none space-y-8 pt-12 sm:mr-0 sm:pt-52 lg:-mt-32 xl:-mt-16">
            <div className="relative h-44">
              <Image
                src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                alt=""
                className="aspect-square w-full rounded-full bg-gray-900/5 object-cover shadow-lg"
                fill
                sizes="11rem"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="relative h-44">
              <Image
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                alt=""
                className="aspect-square w-full rounded-full bg-gray-900/5 object-cover shadow-lg"
                fill
                sizes="11rem"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
            </div>
          </div>
          <div className="-mt-12 w-44 flex-none space-y-8 sm:pt-48 lg:-mt-56 xl:-mt-40">
            <div className="relative h-44">
              <Image
                src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                alt=""
                className="aspect-square w-full rounded-full bg-gray-900/5 object-cover shadow-lg"
                fill
                sizes="11rem"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div className="relative h-44">
              <Image
                src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                alt=""
                className="aspect-square w-full rounded-full bg-gray-900/5 object-cover shadow-lg"
                fill
                sizes="11rem"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
