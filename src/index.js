import React, { Component } from "react";

class ReorderImages extends Component {
  constructor(props) {
    super();
    const { images } = props;
    this.state = {
      images
    };
    this.dragId = '';
  }

  imageDragOver = ev => ev.preventDefault();

  imageDragStart = ev => this.dragId = ev.target.id; 

  dropImage = ev => {
    ev.preventDefault();
    const dragElement = this.dragId.split('-');
    let dragIndex = '';
    if (dragElement.length > 1) {
      dragIndex = dragElement[0];
    }

    const dropElement = ev.target.id.split('-');
    let dropIndex = '';
    if (dropElement.length > 1) {
      dropIndex = dropElement[0];
    }

    if (dragIndex !== '' && dropIndex !== '') {
        const { images } = this.state;
        const dragObject = images[dragIndex];
        images.splice(dragIndex, 1);
        images.splice(dropIndex, 0, dragObject);
        this.setState({ images });
        this.props.callback(images);
    }
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        {images && images.length > 0 &&
          images.map((img, index) => {
            return (
              <div
                className="col-lg-2 col-md-3 col-sm-6"
                style={{padding:'20px'}}
                key={index}
                id = {`${index}-div`}
                onDrop={this.dropImage}
                onDragOver={this.imageDragOver}
              >
                <img
                  id = {`${index}-img`}
                  draggable={true}
                  onDragStart={this.imageDragStart}
                  style={{width:'150px',height:'150px'}}
                  alt="100%x190"
                  src={img.url}
                  data-holder-rendered="true"
                />
              </div>
            );
          })}
      </div>
    );
  }
}
export default ReorderImages;
