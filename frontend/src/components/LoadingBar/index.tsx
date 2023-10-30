import { Container } from "./index.styled";

interface Props {
    bgcolor: any;
    completed: number;
}

const ProgressBar = (props: Props) => {
    const { bgcolor, completed } = props;
    
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
      }
    
    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        transition: 'width 1s ease-in-out',
        // textAlign: 'right'
    }
    
    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <Container>
            <div style={containerStyles}>
                <div style={fillerStyles}>
                    <span style={labelStyles}>{`${completed}%`}</span>
                </div>
            </div>
        </Container>
    );
}; 

export default ProgressBar;
