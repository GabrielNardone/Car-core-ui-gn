import Swal, { SweetAlertResult } from 'sweetalert2';

export enum NOTIFICATION_TYPE {
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
	DELETED = 'deleted',
}
export const notifyStatus = (
	type: NOTIFICATION_TYPE,
	message: string,
): Promise<SweetAlertResult<unknown>> => {
	switch (type) {
		case NOTIFICATION_TYPE.SUCCESS:
			return Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: message,
				showConfirmButton: false,
				timer: 2500,
				background: '#000000',
				color: '#F0F0F0',
			});
		case NOTIFICATION_TYPE.ERROR:
			return Swal.fire({
				icon: 'error',
				title: message,
				timer: 2500,
				background: '#000000',
				color: '#F0F0F0',
			});
		case NOTIFICATION_TYPE.WARNING:
			return Swal.fire({
				icon: 'warning',
				title: message,
				timer: 2500,
				background: '#000000',
				color: '#F0F0F0',
			});
		case NOTIFICATION_TYPE.DELETED:
			return Swal.fire({
				title: 'Deleted!',
				text: 'Your car has been deleted.',
				icon: 'success',
				background: '#000000',
				color: '#F0F0F0',
				confirmButtonColor: '#17B169',
				confirmButtonText: message,
			});
	}
};

export const notifyConfirmation = (
	confirmButtonText: string,
	callback: (id: number) => void,
	id: number,
) => {
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		background: '#000000',
		color: '#F0F0F0',
		showCancelButton: true,
		confirmButtonColor: '#17B169',
		cancelButtonColor: '#d33',
		confirmButtonText: confirmButtonText,
	}).then((result) => {
		if (result.isConfirmed) {
			callback(id);
		}
	});
};
