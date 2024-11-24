import bgApi from "@/repositories/bg-api";

export default async function putBlind<T extends Event>(event: T) {
  // get config and blinds
  const config = await bgApi.getConfig();
  let blinds = Array.from(
    document.querySelectorAll<HTMLElement>(".document-blind")
  );
  // check if the extension is activated
  if (!config.isActivated) {
    blinds.forEach((blind) => blind.remove());
    return;
  } else {
    // create blinds if not exist
    while (blinds.length < 2) {
      const blind = document.createElement("div");
      blind.classList.add("document-blind");
      document.body.append(blind);
      blinds.push(blind);
    }
    // get properties
    const remInPixels = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const offset = (config.spaceSize * remInPixels) / 2;
    const opacity = config.opacity;
    // update blind properties
    if (config.isHorizontal) {
      // horizontal
      blinds.forEach((blind, i) => {
        blind.style.left = "0px";
        blind.style.width = `${window.innerWidth}px`;
        blind.style.opacity = `${opacity}`;
        if (event instanceof MouseEvent) {
          blind.style.top = `${i === 0 ? 0 : event.clientY + offset}px`;
          blind.style.height = `${
            i === 0
              ? event.clientY - offset
              : window.innerHeight - event.clientY - offset
          }px`;
        } else {
          blind.style.top = `${
            i === 0 ? 0 : window.innerHeight / 2 + offset
          }px`;
          blind.style.height = `${window.innerHeight / 2 - offset}px`;
        }
      });
    } else {
      // vertical
      blinds.forEach((blind, i) => {
        blind.style.top = "0px";
        blind.style.height = `${window.innerHeight}px`;
        blind.style.opacity = `${opacity}`;
        if (event instanceof MouseEvent) {
          blind.style.left = `${i === 0 ? 0 : event.clientX + offset}px`;
          blind.style.width = `${
            i === 0
              ? event.clientX - offset
              : window.innerWidth - event.clientX - offset
          }px`;
        } else {
          blind.style.left = `${
            i === 0 ? 0 : window.innerWidth / 2 + offset
          }px`;
          blind.style.width = `${window.innerWidth / 2 - offset}px`;
        }
      });
    }
  }
}
