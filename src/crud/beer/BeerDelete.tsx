// import { useNavigate } from 'react-router-dom';
// import { deleteBeer, deleteBeerDetails } from '../../services/api';

// export const useDeleteBeer = (beerId: number, beerDetailsId: number | undefined) => {
//     const navigate = useNavigate();

//     const handleDelete = async () => {
//         try {
//             if (beerDetailsId) {
//                 // Supprimer les détails de la bière 
//                 await deleteBeerDetails(beerDetailsId);
//             }

//             // supprimer la bière
//             await deleteBeer(beerId);
            
//             alert('Bière et ses détails supprimés avec succès !');
//             navigate('/beers');
//         } catch (error) {
//             console.error('Erreur lors de la suppression de la bière et de ses détails :', error);
//         }
//     };

//     return handleDelete;
// };
