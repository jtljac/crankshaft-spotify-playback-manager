const soundsDir = "/sounds/";

export enum DeckAudioFx {
    bumperEnd = "bumper_end.wav",
    negativeConfirmation = "confirmation_negative.wav",
    achievementToast = "deck_ui_achievement_toast.wav",
    bumperEnd2 = "deck_ui_bumper_end_02.wav",
    activate = "deck_ui_default_activation.wav",
    hideModal = "deck_ui_hide_modal.wav",
    openGameDetail = "deck_ui_into_game_detail.wav",
    launchGame = "deck_ui_launch_game.wav",
    messageToast = "deck_ui_message_toast.wav",
    misc1 = "deck_ui_misc_01.wav",
    misc8 = "deck_ui_misc_08.wav",
    misc10 = "deck_ui_misc_10.wav",
    navigation = "deck_ui_navigation.wav",
    outOfGameDetail = "deck_ui_out_of_game_detail.wav",
    showModal = "deck_ui_show_modal.wav",
    sideMenuOpen = "deck_ui_side_menu_fly_in.wav",
    sideMenuClose = "deck_ui_side_menu_fly_out.wav",
    sliderDown = "deck_ui_slider_down.wav",
    sliderUp = "deck_ui_slider_up.wav",
    switchOff = "deck_ui_switch_toggle_off.wav",
    switchOn = "deck_ui_switch_toggle_on.wav",
    tabTransition = "deck_ui_tab_transition.wav",
    tileScroll = "deck_ui_tile_scroll.wav",
    toast = "deck_ui_toast.wav",
    typing = "deck_ui_typing.wav",
    volume = "deck_ui_volume.wav",
    pop = "pop_sound.m4a",
    atMention = "steam_at_mention.m4a",
    chatroomNotification = "steam_chatroom_notification.m4a",
    message = "ui_steam_message_old_smooth.m4a",
    friendJoin = "ui_steam_smoother_friend_join.m4a",
    friendOnline = "ui_steam_smoother_friend_online.m4a"
}

export async function playAudioEffect(soundEffect: DeckAudioFx) {
    await new Audio(soundsDir + soundEffect).play();
}