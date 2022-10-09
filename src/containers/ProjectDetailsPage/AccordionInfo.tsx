import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export default function AccordionInfo() {
  return (
    <div className="w-full rounded-2xl">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>Descriptions</span>
              <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-neutral-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-neutral-500 text-sm dark:text-neutral-400" as="p">
              Macabre Plan is a desperate cry to freedom, to resistance, to do it now! Wake up! addressed to oneself and to whoever is next to it: 'resist and don't fall, stay strong' despite the gale and storm. It is feeling in an abyss, in a system where you feel totally outside and abandoned, swimming against the current of what is established, where you have to survive. In a place where you feel like a pawn in a wheel and you can't get out of there. Where you fall over and over and have to get back up. Where are you the resistance… Where are we the resistance! You get out of the norm, you try to cheat that system, which is controlled by 'those above', to do the only thing in life you want. You don't want to get carried away, you're not just another sheep
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {/* <Disclosure defaultOpen as="div" className="mt-5 md:mt-8">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 rounded-lg hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>Details</span>
              <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-neutral-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 flex flex-col text-xs text-neutral-500 dark:text-neutral-400 overflow-hidden">
              <span>2000 x 2000 px.IMAGE(685KB)</span>
              <br />
              <span>Contract Address</span>
              <span className="text-base text-neutral-900 dark:text-neutral-100 line-clamp-1">0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a</span>

              <br />
              <span>Token ID</span>
              <span className="text-base text-neutral-900 dark:text-neutral-100">100300372864</span>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure> */}
    </div>
  );
}
