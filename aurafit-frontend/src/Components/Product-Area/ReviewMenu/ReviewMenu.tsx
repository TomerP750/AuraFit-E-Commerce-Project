import "./ReviewMenu.css";
import {JSX} from "react";
import {FiEdit2, FiTrash2} from "react-icons/fi";


interface ReviewMenuProps {
    onEdit: () => void;
    onDelete: () => void;
}
export function ReviewMenu({ onEdit, onDelete }: ReviewMenuProps): JSX.Element {
    return (
        <div className="absolute right-0 mt-5 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            <button
                onClick={onEdit}
                className="cursor-pointer flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <FiEdit2 className="mr-2" /> Edit Review
            </button>
            <button
                onClick={onDelete}
                className="cursor-pointer flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
            >
                <FiTrash2 className="mr-2" /> Delete Review
            </button>
        </div>
    );
}
