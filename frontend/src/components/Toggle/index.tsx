import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Container,
} from './index.styled';

type ToggleProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  toggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const Toggle = ({ toggled, onToggle }: ToggleProps) => {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onToggle(!isToggled)
    }

    return (
        <Container>
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span />
        </Container>
    )
};

Toggle.defaultProps = {
  toggled: false,
  onToggle: () => {},
};

export default Toggle;
