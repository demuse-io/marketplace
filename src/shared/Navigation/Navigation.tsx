import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "data/navigation";
import MetamaskButton from "components/MetamaskButton";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useProvider } from "hooks/useProvider";

function Navigation() {
  const { connected } = useProvider();
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {!connected ? (
        <ButtonPrimary>
          <MetamaskButton />
        </ButtonPrimary>
      ) : (
        <MetamaskButton />
      )}
      <div className="mr-15"></div>
      {NAVIGATION_DEMO_2.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
