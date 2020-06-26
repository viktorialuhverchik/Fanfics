import React from 'react';
import './story.css';

const Story = () => {
    return (
        <div className="form-story">
            <h1>Story 1</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <img src="..." class="card-img-top" alt="..."></img>
            <div className="d-flex justify-content-center align-items-center">
                <i className="fa fa-heart"></i>
                <button type="button" 
                    className="btn btn-comments">
                        <i class="fa fa-comments" aria-hidden="true"></i>
                </button>
                <button 
                type="button" 
                className="btn btn-star">
                    {/* onClick={onToggleImportant} */}
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </button>
            </div>
        </div>
    )
}

export default Story;