import { ReactNode } from 'react';
import Modal from 'react-modal';

const customStyles = {
	content: {
		display: 'flex',
		justifyContent: 'center',
		alingItems: 'center',
		height: '500px',
		width: '700px',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
	overlay: {
		backgroundColor: 'rgba(0,0,0,.4)',
	},
};

Modal.setAppElement('#root');

interface modalProps {
	children: ReactNode;
	isOpen: boolean;
	onCloseModal: () => void;
}

export const GalleryModal = ({
	children,
	isOpen,
	onCloseModal,
}: modalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onCloseModal}
			style={customStyles}
			closeTimeoutMS={200}
		>
			{children}
		</Modal>
	);
};
