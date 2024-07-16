import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import useStores from "../hooks/useStores";

interface Props {
  gameId: string;
}

const StoreLink = ({ gameId }: Props) => {
  const { data, error } = useStores(gameId);

  const storeNames: Record<string, string> = {
    "1": "Steam",
    "2": "Microsoft",
    "3": "Playstation",
    "4": "Apple",
    "5": "Gog",
    "6": "Nintendo",
    "7": "Xbox",
    "8": "Google",
    "9": "Itchio",
    "10": "Other",
    "11": "Epic Games",
  };

  if (error) return null;

  // Group URLs by storeId
  const storeUrls: Record<string, string[]> = {};
  data.forEach((store) => {
    const storeId = store.store_id.toString();
    if (!storeUrls[storeId]) {
      storeUrls[storeId] = [];
    }
    storeUrls[storeId].push(store.url);
  });

  const handleStoreClick = (url?: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <Menu placement="bottom-start" flip={true}>
      <MenuButton as={Button} variant="outline" colorScheme="blue">
        Get store link
      </MenuButton>
      <Portal>
        <MenuList zIndex="popover">
          {Object.keys(storeUrls).map((storeId) => (
            <MenuItem
              key={storeId}
              onClick={() => handleStoreClick(storeUrls[storeId][0])}
            >
              {storeNames[storeId] || `Store ${storeId}`}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default StoreLink;
