type TConfirmDialogProps = {
	onConfirm: () => void;
	onCancel: () => void;
	open: boolean;
};

export const ConfirmDialog = ({ open, onConfirm, onCancel }: TConfirmDialogProps) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-xs p-6 relative animate-fade-in flex flex-col items-center">
				<p className="text-lg font-semibold text-gray-800 mb-4 text-center">Are you sure you want to delete this debt?</p>
				<div className="flex gap-4 mt-2">
					<button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
						Cancel
					</button>
					<button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};
