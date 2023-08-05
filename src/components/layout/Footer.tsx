import { type ComponentPropsWithoutRef } from "react";

type TSvgProps = ComponentPropsWithoutRef<"svg">;

const navigation = [
  {
    name: "GitHub",
    href: "https://github.com/angelmc32/proof-of-community",
    icon: ({ ...props }: TSvgProps) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Notion",
    href: "https://camilor.notion.site/b2eb06980f65486ca0c2608ab724c7e5?v=11e5477009a340fb8aa7b353ebf8ed35&pvs=4",
    icon: ({ ...props }: TSvgProps) => (
      <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
        <path
          fill="currentColor"
          d="M3.258 3.117c.42.341.577.315 1.366.262l7.433-.446c.158 0 .027-.157-.026-.183l-1.235-.893c-.236-.184-.551-.394-1.155-.341l-7.198.525c-.262.026-.315.157-.21.262l1.025.814zm.446 1.732v7.821c0 .42.21.578.683.552l8.17-.473c.472-.026.525-.315.525-.656V4.324c0-.34-.131-.525-.42-.499l-8.538.499c-.315.026-.42.184-.42.525zm8.065.42c.052.236 0 .472-.237.499l-.394.078v5.774c-.341.184-.657.29-.92.29-.42 0-.525-.132-.84-.526L6.803 7.342v3.911l.815.184s0 .472-.657.472l-1.812.105c-.053-.105 0-.367.184-.42l.472-.13V6.292L5.15 6.24c-.053-.236.078-.577.446-.604l1.944-.13L10.22 9.6V5.978l-.683-.079c-.053-.289.157-.499.42-.525l1.813-.105zm-9.93-3.937L9.326.781c.919-.08 1.155-.026 1.733.394l2.39 1.68c.395.288.526.367.526.682v9.212c0 .578-.21.92-.946.971l-8.694.525c-.552.027-.815-.052-1.104-.42l-1.76-2.283c-.315-.42-.446-.735-.446-1.103V2.25c0-.472.21-.866.814-.918z"
        />
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="bg-poc_blueDarkOxford font-spaceGrotesk">
    <div className="mx-auto p-6 md:flex md:items-center md:justify-between md:px-8 lg:px-12">
      <div className="flex justify-center space-x-6 md:order-2">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-white hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">{item.name}</span>
            <item.icon
              className="h-6 w-6 hover:text-primary"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
      <div className="mt-4 md:order-1 md:mt-0">
        <p className="text-center font-spaceGrotesk text-sm leading-5 text-white">
          &copy; {new Date().getFullYear()} Proof of Community
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
