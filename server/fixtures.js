if (Goals.find().count() === 0) {
    Goals.insert({
        category: 'school',
        icon: 'phone',
        goal: 'get the category thing working',
        status: 'completed'
    });

    Goals.insert({
        category: 'work',
        icon: 'envelope',
        goal: 'do some css work',
        status: 'completed'
    });

    Goals.insert({
        category: 'personal',
        icon: 'cart',
        goal: 'add an admin section',
        status: 'inprogress'
    });
}