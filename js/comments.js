export default class Comment {
  constructor(comment) {
    this.user = comment.user;
    this.profileImage = comment.profileImage;
    this.content = comment.content;
  }

  render() {
    return `<div>
                <article class="commentArticle">
                    <div class="topSection"> 
                        <img src="../${this.profileImage}" alt="salon" class="profileImage">
                        <div class="profileName">${this.user}</div>
                    </div>
                    <div class="comments">${this.content}</div>      
                </article>
                </div>
            `;
  }
}
