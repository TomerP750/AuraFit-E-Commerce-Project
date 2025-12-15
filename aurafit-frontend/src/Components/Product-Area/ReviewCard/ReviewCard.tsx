import "./ReviewCard.css";
import {JSX, useState} from "react";
import {Review} from "../../../Models/Review.ts";
import {FaStar} from "react-icons/fa";
import {useUserSelector} from "../../../Redux/hooks.ts";
import {FiMoreVertical} from "react-icons/fi";
import {ReviewMenu} from "../ReviewMenu/ReviewMenu.tsx";
import reviewService from "../../../Services/ReviewService.ts";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {UpdateReviewDTO} from "../../../Models/DTOS/UpdateReviewDTO.ts";
import {StarRating} from "../ProductPage-Area/components/StarRating/StarRating.tsx";

interface ReviewCardProps {
    review: Review
}

export function ReviewCard({review}: ReviewCardProps): JSX.Element {

    const user = useUserSelector((state) => state.authSlice.user);
    const [reviewMenuOpen, setReviewMenuOpen] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm<Review>()
    const newContent = watch("content", "");
    const [rating, setRating] = useState(review.rating);

    function handleDelete(id: number): void {
        const answer = window.confirm("Are you sure you want to delete your review?");
        if (answer) {
            reviewService.deleteReview(id)
                .then(() => {
                    toast.success("Review deleted successfully.")
                    setReviewMenuOpen(false);
                })
                .catch(err => toast.error(err.response.data));
        }
    }

    function sendUpdatedReview(data: UpdateReviewDTO): void {
        const dto: UpdateReviewDTO = {
            id: review.id,
            content: data.content.trim(),
            rating
        }
        setReviewMenuOpen(false);
        reviewService.updateReview(dto)
            .then(() => {
                toast.success("Review updated successfully.")
                setOnEdit(false);

            })
            .catch(err => toast.error(err.response.data));

    }

    function handleOnEdit() {
        setOnEdit(true);
        setReviewMenuOpen(false)
    }


    return (
        <div className="w-full flex flex-col items-start flex-1 gap-8">
            <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex gap-2">
                        <p className="font-medium text-2xl">{review.user.firstName}</p>
                        <p className="font-medium text-2xl">{review.user.lastName}</p>
                    </div>
                    {user && review.user.id === user.id &&
                        <div className="relative flex flex-col items-center">
                            <FiMoreVertical
                                onClick={() => setReviewMenuOpen(!reviewMenuOpen)}
                                className={"cursor-pointer text-gray-500 hover:text-black"} size={20}/>
                            {reviewMenuOpen &&
                                <ReviewMenu onDelete={() => handleDelete(review.id)} onEdit={handleOnEdit}/>}
                        </div>}

                </div>
                <div className="flex gap-1">
                    {onEdit
                        ? <StarRating rating={rating}
                                      onRatingChange={setRating}
                                      editable
                                      size={24} />
                        : Array.from({length: 5}, (_, i) => (
                        <FaStar
                            key={i}
                            className={i < review.rating ? "text-yellow-500" : "text-gray-400"}
                        />))}

                </div>
            </div>

            <hr className={`${onEdit ? "hidden" : "text-gray-500/50 w-full"}`}/>

            {onEdit ?
                <form onSubmit={handleSubmit(sendUpdatedReview)} className="flex flex-col w-full gap-3">
                    <textarea
                        rows={4}
                        {...register("content")}
                        className={"resize-none row-span-4"}
                        placeholder={"Enter Content.."}
                    />
                    <div className="flex gap-3">
                        <button
                            type={"submit"}
                            disabled={newContent.length === 0}
                            className="text-gray-500 hover:text-black disabled:hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >Save
                        </button>
                        <button
                            type={"button"}
                            className="text-gray-500 hover:text-black cursor-pointer"
                            onClick={() => setOnEdit(false)}>Cancel
                        </button>
                    </div>
                </form>
                :
                <p>{review.content}</p>}
        </div>
    );
}
