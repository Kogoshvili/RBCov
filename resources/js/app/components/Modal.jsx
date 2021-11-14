import PropTypes from 'prop-types';

function Modal({ title = '', content = '', visible = false, onCloseClick }) {
    return (
        <div className="Modal">
            <div className="modal" style={{ 'display': visible ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{ title }</h5>
                            <button type="button" className="btn-close" onClick={onCloseClick}></button>
                        </div>
                        <div className="modal-body">
                            { content }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    title: PropTypes.string,
    content: PropTypes.any,
    visible: PropTypes.bool,
    onCloseClick: PropTypes.func
};

export default Modal;
