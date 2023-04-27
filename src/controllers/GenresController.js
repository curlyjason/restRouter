

class GenresController extends require('./Controller') {

    async index() {
        this.set({genres: super.index()});
        return this.View.render();
    }
}

module.exports = GenresController
