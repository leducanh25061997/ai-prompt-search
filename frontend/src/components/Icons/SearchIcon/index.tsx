const SearchIcon: React.FC<{ color?: string, width?: string, height?: string }> = ({ color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : "23"}
      height={height ? height : "23"}
      fill="none"
      viewBox="0 0 23 23"
    >
      <path
        fill={color ? color : "#fff"}
        d="M9.667 19c2.07 0 4.082-.694 5.713-1.97l5.129 5.13 1.65-1.65-5.13-5.129A9.278 9.278 0 0019 9.667C19 4.52 14.813.333 9.667.333 4.52.333.333 4.521.333 9.667S4.52 19 9.667 19zm0-16.333c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7z"
      ></path>
    </svg>
  );
}

export default SearchIcon;
