// GitHub Actions で利用している Linux と UNIX システムが大文字と小文字を区別するため、
// react-icons のドキュメントと異なり小文字で import しています
import * as iconsBs from "react-icons/bs";
import * as iconsFa from "react-icons/fa";
import * as iconsFa6 from "react-icons/fa6";
import { IconBaseProps } from "react-icons";
import PropTypes from "prop-types";

export type IconName = keyof typeof iconsBs | keyof typeof iconsFa | keyof typeof iconsFa6;

type IconProps = IconBaseProps & {
  name: IconName;
};

const icons = { ...iconsBs, ...iconsFa, ...iconsFa6 };

/**
 * 現在、使用できるアイコンは以下です。
 * - [Bootstrap Icons](https://react-icons.github.io/react-icons/icons/bs/)
 * - [Font Awesome 5](https://react-icons.github.io/react-icons/icons/fa/)
 * - [Font Awesome 6](https://react-icons.github.io/react-icons/icons/fa6/)
 */
export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconCore = icons[name];
  return <IconCore {...props} />;
};

Icon.propTypes = {
  name: PropTypes.oneOf<IconName>(Object.keys(icons) as IconName[]).isRequired,
};
