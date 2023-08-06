import HoverContainer from '@/components/ui/HoverContainer.tsx';
import { BiSolidEdit, BiSolidImageAdd } from 'react-icons/bi';

interface IPropertyIcons {
  setIsImageUploadShow: (args: (prev: boolean) => boolean) => void;
  setIsEditModalActive: (args: boolean) => void;
}

const PropertyIcons = ({
  setIsImageUploadShow,
  setIsEditModalActive,
}: IPropertyIcons) => {
  return (
    <div className="flex flex-row gap-2">
      <HoverContainer>
        <BiSolidImageAdd
          size={30}
          onClick={() => setIsImageUploadShow((prev: boolean) => !prev)}
        />
      </HoverContainer>
      <HoverContainer>
        <BiSolidEdit size={30} onClick={() => setIsEditModalActive(true)} />
      </HoverContainer>
    </div>
  );
};

export default PropertyIcons;
