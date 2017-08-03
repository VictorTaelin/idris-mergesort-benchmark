testList : Int -> List Int
testList size = go [] size 12345 where
  go : List Int -> Int -> Int -> List Int
  go r 0 seed = r
  go r x seed = go ((seed' `mod` 1000) :: r) (x - 1) seed' where
    seed' = seed * 12345 + 768 `mod` 65536

mergeSort : Int -> List Int -> List Int
mergeSort lenLog2 lis = split lenLog2 lis (\ res, lis => res) where

  reverse : List Int -> List Int
  reverse xs = go [] xs where
    go : List Int -> List Int -> List Int
    go r []        = r
    go r (x :: xs) = go (x :: r) xs

  merge : List Int -> List Int -> List Int
  merge a b = go [] a b where
    go : List Int -> List Int -> List Int -> List Int
    go r []        []        = reverse r
    go r []        (b :: bs) = go (b :: r) [] bs
    go r (a :: as) []        = go (a :: r) as []
    go r (a :: as) (b :: bs) = if a < b
      then go (a :: r) as (b :: bs)
      else go (b :: r) (a :: as) bs

  split : Int -> List Int -> ((List Int -> List Int -> t) -> t)
  split 0 []
    = (\ t => t [0] [])
  split 0 (x :: xs)
    = (\ t => t [x] xs)
  split d lis
    =  split (d - 1) lis (\ lef, lis
    => split (d - 1) lis (\ rig, lis
    => (\ t => t (merge lef rig) lis)))

su : List Int -> Int
su list = go 0 list where
  go : Int -> List Int -> Int
  go r []        = r
  go r (x :: xs) = go (x + r) xs

main : IO ()
main = do 
  let log2 = 8 + 8 + 4
  let size = 256 * 256 * 16
  let list = testList size
  printLn (su (mergeSort log2 list))
