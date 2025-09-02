import PostInteraction from "../../models/interaction/postInteractionModel.js";

export const postInteraction = async (userId, postId, action) => {
    let interaction = await PostInteraction.findOne({ userId, postId }).exec();

    if (!interaction) {
        interaction = new PostInteraction({ userId, postId });
    }

    switch (action) {
        case 'LIKED':
            interaction.isLiked = true;
            break;
        case 'UNLIKED':
            interaction.isLiked = false;
            break;
        case 'COMMENTED':
            interaction.noOfComments += 1;
            break;
        case 'UNCOMMENTED':
            interaction.noOfComments = Math.max(interaction.noOfComments - 1, 0);
            break;
        case 'SHARED':/*  */
            interaction.isShared = true;
            break;
        case 'UNSHARED':/*  */
            interaction.isShared = false;
            break;
        case 'SENT':/*  */
            interaction.isSent = true;
            break;
        case 'UNSENT': /*  */
            interaction.isSent = false;
            break;
        case 'SAVED':
            interaction.isSaved = true;
            break;
        case 'UNSAVED':
            interaction.isSaved = false;
            break;
    }

    if (
        !interaction.isLiked &&
        interaction.noOfComments === 0 &&
        !interaction.isShared &&
        !interaction.isSent &&
        !interaction.isSaved
    ) {
        await PostInteraction.deleteOne({ _id: interaction._id });
        return null;
    }

    await interaction.save();
    return interaction;
};
