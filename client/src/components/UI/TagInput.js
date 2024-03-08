import { useState } from "react";
import suggestions from "../../util/tags";

export default function TagInput({ tags, setTags }) {

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (
        <div className="taginput my-4">
            <div>
                <input type="text" list="suggestions"
                    placeholder="Enter Here" />
                <datalist id="suggestions">
                    {suggestions.map(suggestion => {
                        <option value={suggestion}>{suggestion}</option>
                    })}
                </datalist>
            </div>
        </div>
    );
}