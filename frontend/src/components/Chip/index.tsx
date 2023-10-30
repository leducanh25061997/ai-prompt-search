interface Props {
    icon?: string;
    title: string;
}

export const Chip = (props: Props) => {
    const { icon, title } = props;

    return (
        <div className="flex">
            {title}
            {icon && <img alt={`${icon}`} src={icon} style={{ width: '15px' }}/>}
        </div>
    )
}