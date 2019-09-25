import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, ActivityIndicator, Text, Image } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
                this.setState({
                    film: data,
                    isLoading: false
                })
            }
        )
    }
    
    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            console.log(getImageFromApi(film.backdrop_path))
            return (
                <ScrollView style={styles.scrollview_container}>
                    <View style={styles.image_view_container}>
                        <Image 
                            style={{width: 'auto', height: 200}}
                            source={{uri: getImageFromApi(film.backdrop_path)}} 
                        />
                    </View>
                    <View style={styles.content_view_container}>
                        <Text style={styles.title}>{film.title}</Text>
                        <Text>{film.overview}</Text>
                        <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                        <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                        <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                        <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                        <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                            return genre.name;
                            }).join(" / ")}
                        </Text>
                        <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                            return company.name;
                            }).join(" / ")}
                        </Text>
                    </View>
                </ScrollView>
            )
        }
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    render () {
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container: {
        flex: 1
    },
    image_view_container: {
        flex: 1,
        backgroundColor: 'red'
    },
    content_view_container: {
        flex: 2,
        backgroundColor: 'blue'
    },
    title: {
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 28,
        fontWeight: 'bold'
    }
})

export default FilmDetail