import PropTypes from 'prop-types';

type HeartIconProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
};

const HeartIcon = ({ active, color }: HeartIconProps) => {
  return active ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 20 19"
      >
        <path
          fill={color || "#FF3D00"}
          d="M10 18.35l-1.45-1.32C3.4 12.36 0 9.27 0 5.5 0 2.41 2.42 0 5.5 0 7.24 0 8.91.81 10 2.08 11.09.81 12.76 0 14.5 0 17.58 0 20 2.41 20 5.5c0 3.77-3.4 6.86-8.55 11.53L10 18.35z"
        ></path>
      </svg>
    )
    :
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 20 18"
      >
        <path
          fill={color || "#fff"}
          d="M10.091 14.954l-.09.091-.1-.09c-4.32-3.919-7.174-6.51-7.174-9.137C2.727 4 4.091 2.636 5.91 2.636c1.4 0 2.764.91 3.246 2.146h1.69c.482-1.237 1.846-2.146 3.246-2.146 1.818 0 3.182 1.364 3.182 3.182 0 2.627-2.855 5.218-7.182 9.136zm4-14.136c-1.582 0-3.1.736-4.09 1.89C9.008 1.555 7.49.819 5.908.819c-2.8 0-5 2.19-5 5C.91 9.245 4 12.054 8.682 16.3L10 17.5l1.318-1.2C16 12.054 19.091 9.245 19.091 5.818c0-2.81-2.2-5-5-5z"
        ></path>
      </svg>
    )
}

HeartIcon.defaultProps = {
  active: false,
  color: '',
}

export default HeartIcon;
