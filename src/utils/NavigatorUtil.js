import {StackActions,NavigationActions} from 'react-navigation';

export default class NavigatorUtil {
    /*
    * 返回上一页
    * */
    static goBack(navigation) {
        navigation.goBack();
    }

    /*
    *  跳转到仓库详情页
    * */
    static goToRepositoryDetail(params) {
        const {navigation, projectModel, flag, theme, onUpdateFavorite} = params;
        navigation.navigate('RepositoryDetail', {
            projectModel,
            flag,
            theme,
            onUpdateFavorite
        })
    }

    /*
    * 欢迎页跳转首页
    * */
    static resetToHomePage(params) {
        const {navigation, theme, selectedTab} = params;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'HomePage',
                    params: {
                        theme: theme,
                        selectedTab: selectedTab
                    }
                })
            ]
        });
        navigation.dispatch(resetAction)
    }

    /*
    * 跳转菜单详情页
    * */
    static goToMenuPage(params, routeName) {
        const {navigation} = params;
        navigation.navigate(
            routeName,
            {
                ...params
            }
        )
    }
}