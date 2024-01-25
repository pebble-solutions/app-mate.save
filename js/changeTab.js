export function transformToPostTimes(data) {
    const postDataRaw = [];


            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const currentItem = data[i];
                    if (currentItem.label === "Pause" || currentItem.label == null || currentItem.label === "Arrêt de l\'activité") {
                // Pause pendant un cycle, sauvegarde la date de fin de pause
                currentItem.label = 'end';
            }
            else if (currentItem.label === "Reprise" || currentItem.label === 'Début d\'activité') {
                currentItem.label = 'start';
            }
            
                
                // Ajoute au tableau postdata
                postDataRaw.push({ currentItem });

            
            }
        }
    
    return postDataRaw  ;
}
export function transformToSession(data) {
    const postSessionTime= [];
      if (data.length>0) {
        const start = data[0].time;
        const end = data[data.length-1].time;
        postSessionTime.push({start, end});
            
      }
        return postSessionTime;
}